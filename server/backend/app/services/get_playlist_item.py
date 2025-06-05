import os
from googleapiclient.discovery import build #pip install google-api-python-client
from google_auth_oauthlib.flow import InstalledAppFlow #pip install google-auth-oauthlib
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"]
TOKEN_NAME = "token.json" # Don't change

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
client_secrets_file = "googleAPI.json"

playlist_id = os.getenv('PLAYLIST_ID')
def getItems():
    creds = None
    print("Checking for token.json")
    if os.path.exists(TOKEN_NAME):
        creds = Credentials.from_authorized_user_file(TOKEN_NAME, SCOPES)
        print("Found token.json")
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                client_secrets_file, SCOPES)
            creds = flow.run_local_server(port=1234)
        # Save the credentials for the next run
        with open(TOKEN_NAME, 'w') as token:
            token.write(creds.to_json())

    googleAPI = build('youtube', 'v3', credentials=creds)

    request = googleAPI.playlistItems().list(
        part="snippet",
        playlistId=playlist_id
    )
    response = request.execute()

    print(response)

if __name__ == "__main__":
    getItems()