import { useState } from "react";

const Challenges = () => {
  const [activeTab, setActiveTab] = useState("beginner");
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const challenges = {
    beginner: [
      {
        id: 1,
        title: "CTF: File Hunt",
        description:
          "Someone left a flag on the system. Navigate the Linux filesystem to retrieve it.",
        tasks: [
          "Objective: Search the entire system for files containing the flag.\nHint: find / -name flag.txt 2>/dev/null",
          "Objective: Open and read the contents of the flag file.\nHint: cat /path/to/flag.txt",
          "Objective: Explore hidden directories that may contain secrets.\nHint: ls -la /home",
          "Objective: Look inside text files that might include the flag string.\nHint: grep -r flag .",
        ],
        reward: "10 POINTS",
        difficulty: "BEGINNER",
        timeEstimate: "15 MIN",
      },
      {
        id: 2,
        title: "CTF: Stego Hunt",
        description: "Uncover a hidden flag embedded in an image.",
        tasks: [
          "Objective: Check the image's metadata for hidden messages.\nHint: exiftool secret.png",
          "Objective: Extract readable strings from the image.\nHint: strings secret.png",
          "Objective: Use a steganography tool to extract embedded files.\nHint: steghide extract -sf secret.png",
          "Objective: Scan the image for embedded data blocks.\nHint: binwalk -e secret.png",
        ],
        reward: "20 POINTS",
        difficulty: "BEGINNER",
        timeEstimate: "25 MIN",
      },
      {
        id: 3,
        title: "CTF: Hidden Messages",
        description:
          "Flags can hide in plain sight. Extract clues buried in plain text files.",
        tasks: [
          "Objective: Recursively search all files for the word 'flag'.\nHint: grep -r flag .",
          "Objective: View file contents in hexadecimal format.\nHint: xxd <file>",
          "Objective: Decode a Base64-encoded string.\nHint: echo <string> | base64 -d",
          "Objective: Decrypt text using basic command-line tools.\nHint: try rev, tr, etc.",
        ],
        reward: "25 POINTS",
        difficulty: "BEGINNER",
        timeEstimate: "30 MIN",
      },
    ],
  };

  const toggleChallengeCompletion = (id: number) => {
    setCompletedChallenges((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#0a0a0a]/90 border border-cyan-400/10 p-6 rounded-lg shadow-lg shadow-cyan-400/5 max-w-5xl mx-auto my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
          <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
          MISSION CONTROL
        </h2>
        <div className="text-xs bg-cyan-400/10 px-3 py-1 rounded-full text-cyan-400 border border-cyan-400/20">
          TRAINING MODE: ACTIVE
        </div>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          className={`px-4 py-2 rounded-md text-xs font-medium border transition-all flex items-center ${
            activeTab === "beginner"
              ? "bg-cyan-400/10 text-cyan-400 border-cyan-400/50"
              : "bg-[#0a0a0a] text-cyan-400/60 border-cyan-400/20 hover:border-cyan-400/40"
          }`}
          onClick={() => setActiveTab("beginner")}
        >
          <span className="mr-1">✦</span> BEGINNER
        </button>
        <button
          className="px-4 py-2 rounded-md text-xs font-medium border bg-[#0a0a0a] text-cyan-400/30 border-cyan-400/10 cursor-not-allowed"
          disabled
        >
          <span className="mr-1">✦</span> INTERMEDIATE{" "}
          <span className="ml-1 text-cyan-400/20">(LOCKED)</span>
        </button>
        <button
          className="px-4 py-2 rounded-md text-xs font-medium border bg-[#0a0a0a] text-cyan-400/30 border-cyan-400/10 cursor-not-allowed"
          disabled
        >
          <span className="mr-1">✦</span> ADVANCED{" "}
          <span className="ml-1 text-cyan-400/20">(LOCKED)</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {challenges[activeTab as keyof typeof challenges]?.map((challenge) => (
          <div
            key={challenge.id}
            onClick={() => toggleChallengeCompletion(challenge.id)}
            className={`bg-[#0a0a0a]/70 p-5 rounded-lg border cursor-pointer ${
              completedChallenges.includes(challenge.id)
                ? "border-cyan-400/50"
                : "border-cyan-400/10"
            } transition-all hover:shadow-cyan-400/5 hover:shadow-lg group`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-xs bg-cyan-400/10 px-2 py-0.5 rounded-full text-cyan-400 mb-1 inline-block">
                  {challenge.difficulty}
                </div>
                <h3 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {challenge.title}
                </h3>
              </div>
              <div className="text-xs text-cyan-400/40">{challenge.reward}</div>
            </div>

            <p className="text-cyan-300/80 mb-4 font-mono text-sm border-l border-cyan-400/20 pl-3">
              {challenge.description}
            </p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider">
                  Objectives
                </h4>
              </div>
              <ul className="text-xs space-y-2 font-mono whitespace-pre-line">
                {challenge.tasks.map((task, i) => (
                  <li key={i} className="flex items-start group">
                    <span className="text-cyan-600 mr-2 mt-0.5">$</span>
                    <span className="text-cyan-300/80 group-hover:text-cyan-200 transition-colors">
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
