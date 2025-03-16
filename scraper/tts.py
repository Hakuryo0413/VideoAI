from openai import OpenAI
from pathlib import Path

import os

from dotenv import load_dotenv

load_dotenv()
# os.getenv("OPENAI_API_KEY")
client = OpenAI()

speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input="Friedrich Merz, Germany’s likely next chancellor, declared the need for European independence from the U.S. after exit polls showed his CDU/CSU coalition winning 28.6% in a snap election dominated by immigration, economic concerns, and Trump-era tensions. Merz criticized U.S. and Russian interference in the campaign, vowing to prioritize European unity. The far-right AfD surged to 20.8%, becoming the second-largest party but excluded from coalition talks due to a “firewall” against extremism. Chancellor Scholz’s SPD collapsed to 16.4%, while the Greens and Die Linke gained. Merz faces complex coalition negotiations, likely involving the SPD or Greens, amid heightened polarization over migration and security. Recent attacks by migrants fueled anti-immigrant rhetoric, with all major parties adopting tougher stances. Voter turnout hit 82.5%, reflecting public engagement. World leaders congratulated Merz, emphasizing transatlantic ties, though his EU sovereignty agenda signals a potential shift from U.S. reliance.",
)
response.stream_to_file("output.mp3")

# print(completion.choices[0].message.content)
