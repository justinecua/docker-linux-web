import { useEffect, useState } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";

const TerminalComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [commandHistory, setCommandHistory] = useState<(string | undefined)[]>(
    []
  );

  useEffect(() => {
    const terminal = new Terminal({
      theme: {
        background: "#0a0a0a",
        foreground: "#00ffcc",
        cursor: "#00ffcc",
        cursorAccent: "#0a0a0a",
      },
      fontFamily: "'Fira Code', monospace",
      fontSize: 14,
      cursorBlink: true,
      letterSpacing: 1,
      lineHeight: 1.2,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    const el = document.getElementById("terminal");

    if (el) {
      terminal.open(el);
      fitAddon.fit();
      terminal.write(
        "\x1b[1;36mEstablishing secure connection to HACK4GOV mainframe...\x1b[0m\r\n"
      );
    }

    const socket = new WebSocket(
      window.location.protocol === "https:"
        ? "wss://practicelinux.live/ws/terminal/"
        : "ws://practicelinux.live/ws/terminal/"
    );

    socket.onopen = () => {
      setIsConnected(true);
      terminal.write("\x1b[1;36mTYPE 'help' FOR COMMAND LIST\x1b[0m\r\n\n");
    };

    socket.onmessage = (e) => terminal.write(e.data);

    terminal.onData((data) => {
      socket.send(data);
      if (data === "\r") {
        setCommandHistory((prev) => [
          ...prev,
          terminal.buffer.active
            ?.getLine(terminal.buffer.active.cursorY)
            ?.translateToString(),
        ]);
      }
    });

    socket.onclose = () => {
      setIsConnected(false);
      terminal.write(
        "\r\n\x1b[1;31mCONNECTION TERMINATED | SESSION ENCRYPTED & ARCHIVED\x1b[0m\r\n"
      );
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col border border-cyan-400/20 bg-[#0a0a0a]/70 shadow-lg shadow-cyan-400/5 rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-cyan-400/10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-sm shadow-red-400/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 shadow-sm shadow-yellow-400/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-sm shadow-cyan-400/30" />
        </div>
        <div className="text-xs text-cyan-400/80 font-mono flex items-center">
          <span className="mr-2">STATUS:</span>
          <span
            className={`px-2 py-0.5 rounded ${
              isConnected
                ? "bg-cyan-400/10 text-cyan-400"
                : "bg-red-400/10 text-red-400"
            }`}
          >
            {isConnected ? "SECURE CONNECTION" : "DISCONNECTED"}
          </span>
        </div>
        <div className="text-xs text-cyan-400/60">
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Terminal Container */}
      <div id="terminal" className="flex-grow w-full p-2" />

      {/* Terminal Footer */}
      <div className="bg-[#0a0a0a] p-3 border-t border-cyan-400/10 grid grid-cols-3 gap-4 text-xs">
        <div>
          <div className="text-cyan-400/80 mb-1 text-[0.7rem] uppercase tracking-wider">
            Quick Commands
          </div>
          <div className="text-cyan-300/80 space-y-1 font-mono">
            <div className="flex items-center hover:text-cyan-200 cursor-pointer transition-colors">
              <span className="text-cyan-600 mr-1">$</span>
              <span>ls -la</span>
            </div>
            <div className="flex items-center hover:text-cyan-200 cursor-pointer transition-colors">
              <span className="text-cyan-600 mr-1">$</span>
              <span>cd /target</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-cyan-400/80 mb-1 text-[0.7rem] uppercase tracking-wider">
            Recent Activity
          </div>
          <div className="text-cyan-300/80 font-mono space-y-1 max-h-16 overflow-y-auto">
            {commandHistory.slice(-3).map((cmd, idx) => (
              <div
                key={idx}
                className="truncate hover:text-cyan-200 cursor-pointer transition-colors"
              >
                {cmd}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
