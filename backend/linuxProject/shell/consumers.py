import os
import pty
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class TerminalConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.master, self.slave = pty.openpty()
        self.read_task = None

        self.process = await asyncio.create_subprocess_exec(
            'bash', '-i',
            stdin=self.slave,
            stdout=self.slave,
            stderr=self.slave,
            env={**os.environ, 'TERM': 'xterm'}
        )

        await self.accept()
        self.read_task = asyncio.create_task(self.read_output())

    async def read_output(self):
        loop = asyncio.get_event_loop()
        try:
            while True:
                data = await loop.run_in_executor(None, os.read, self.master, 1024)
                if not data:
                    break
                await self.send(data.decode(errors="ignore"))
        except Exception as e:
            print("PTY read error:", e)

    async def receive(self, text_data):
        try:
            os.write(self.master, text_data.encode())
        except Exception as e:
            print("PTY write error:", e)

    async def disconnect(self, close_code):
        try:
            if self.read_task:
                self.read_task.cancel()
                try:
                    await self.read_task
                except asyncio.CancelledError:
                    pass

            if self.process:
                self.process.terminate()
                try:
                    await asyncio.wait_for(self.process.wait(), timeout=5)
                except asyncio.TimeoutError:
                    self.process.kill()

            os.close(self.master)
            os.close(self.slave)
        except Exception as e:
            print("Cleanup error:", e)
