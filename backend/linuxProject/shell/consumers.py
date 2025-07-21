import os
import pty
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class TerminalConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.master, self.slave = pty.openpty()

        self.process = await asyncio.create_subprocess_exec(
            'bash', '-i',
            stdin=self.slave,
            stdout=self.slave,
            stderr=self.slave,
            env={**os.environ, 'TERM': 'xterm'} 
        )

        await self.accept()
        asyncio.create_task(self.read_output())

    async def read_output(self):
        loop = asyncio.get_event_loop()
        while True:
            try:
                data = await loop.run_in_executor(None, os.read, self.master, 1024)
                await self.send(data.decode(errors="ignore"))
            except Exception as e:
                print("PTY read error:", e)
                break

    async def receive(self, text_data):
        os.write(self.master, text_data.encode())

    async def disconnect(self, close_code):
        if self.process:
            self.process.terminate()
