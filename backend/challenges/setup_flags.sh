#!/bin/bash

# === Setup Directories ===
mkdir -p /challenges/{filehunt,stego,hidden_messages}
mkdir -p /var/.answers_donuts
chmod 700 /var/.answers_donuts

# === Challenge 1: File Hunt ===
mkdir -p /challenges/filehunt/.hidden_path
echo "FLAG{file_hunt_success}" > /challenges/filehunt/.hidden_path/flag.txt
echo "FLAG{file_hunt_success}" > /var/.answers_donuts/filehunt.txt

# === Challenge 2: Stego Hunt (Pacquiao Meme) ===
mkdir -p /challenges/stego

# ✅ Download Manny Pacquiao meme image
curl -sL https://www.myboxingfans.com/wp-content/uploads/2010/06/06-chat1-mannypacquiao.jpg -o /challenges/stego/base.jpg

# Embed flag using steghide (no password)
echo "FLAG{pacquiao_hidden_power}" > /tmp/stego_flag.txt
steghide embed -cf /challenges/stego/base.jpg -ef /tmp/stego_flag.txt -p "" -sf /challenges/stego/secret.jpg

# Add EXIF comment
exiftool -overwrite_original -Comment="FLAG{pacquiao_exif_strength}" /challenges/stego/secret.jpg

# Save real answers (not visible to player)
echo "FLAG{pacquiao_hidden_power}" > /var/.answers_donuts/stego_embed.txt
echo "FLAG{pacquiao_exif_strength}" > /var/.answers_donuts/stego_exif.txt
rm /tmp/stego_flag.txt

# === Challenge 3: Hidden Messages (Hardened) ===
mkdir -p /challenges/hidden_messages

# 1. Base64 (not visible to cat)
echo "This message looks strange: $(echo -n 'FLAG{hidden_base64}' | base64)" > /challenges/hidden_messages/base64_hint.txt
echo "FLAG{hidden_base64}" > /var/.answers_donuts/base64.txt

# 2. Reversed (not obvious)
echo "Sometimes things are backwards: $(echo -n 'FLAG{reversed_msg}' | rev)" > /challenges/hidden_messages/reversed_hint.txt
echo "FLAG{reversed_msg}" > /var/.answers_donuts/reversed.txt

# 3. Hex (safe, no ASCII shown)
echo -n "FLAG{hex_dump}" | xxd -p > /challenges/hidden_messages/hex_hint.txt
echo "FLAG{hex_dump}" > /var/.answers_donuts/hex.txt

# 4. Logs (20 lines of noise, 1 real flag line)
for i in {1..20}; do echo "INFO: task complete $(date)" >> /challenges/hidden_messages/logs_flag.txt; done
echo "DEBUG: operation failed at byte offset 98234" >> /challenges/hidden_messages/logs_flag.txt
echo "ALERT: FLAG{grep_this}" >> /challenges/hidden_messages/logs_flag.txt
echo "FLAG{grep_this}" > /var/.answers_donuts/logs.txt

# === Lock the answers folder ===
chmod 700 /var/.answers_donuts
echo "ilovedonuts" > /var/.answers_donuts/.pwlock
chmod 600 /var/.answers_donuts/.pwlock
