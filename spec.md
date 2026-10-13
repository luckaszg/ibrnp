## project description
this application serves as a video editor page where users can upload video and audio and then click `start` to start with the processing. When video is being processing, user will see an `inprogress` bar showing the current state of the processing. Once the processing finishes, user can see a preview of the final video. User can choose to either download the final version, or add some description about what else need to be done first. To add these new descriptions, users have to use a text-box with the possibility of adding new items: audio, video, images.


## project stack
This section summarizes the tech stack used for this project

### Client
The client must be written in react

### Server
The server will be written in python

### Database
Database for this project will be mongodb

OBS: Containerization is needed so we'll use Docker and Docker compose to get everything together

## Technical aspects
Once the video finishes, user can get a preview using websocket, so no all data is being sent at one, but at batches

## Milestones

### First Milestone

For the first milestone lets just create the client side and expose it to port 9000 using Docker. The first milestone will have every UI element. At this point, user can do everything stated in the project description, but nothing actually happen on the server side (this is something we'll work on after).

### Second milestone

For this milestone we need to add the possibility of users to pick more than one video and audio. So, users can now add multiple video and/or audio and have a list of them displayed below. The list must be overflow, meaning it must not take the whole page, but rather render a table with video / audio names where the entries will be 10 as much, and everything beyond that will be reach by scrolling down/up.

Also, for this milestone lets try to read the whole files in the client directly. Because the files can be too large, lets read each one by chunks of 10MB at a time. Users must see a loading process (can be a modal or give me options) stating the state of the reading process. This have to start once users hits on "Comenzar" button.


## Routing
Each step of the flow has its own URL, so users can go back and forth with the browser's Back and Forward buttons:
- `/upload`: pick the video and audio files (`/` and any unknown path redirect here)
- `/processing`: the `inprogress` bar
- `/preview`: the final video, download and change requests

Going back keeps the files already picked. Going back while processing (or while files are being read) cancels it; going forward again does not resume it, the user has to start again. Once processing finishes, its history entry is replaced by the preview, so Back from the preview returns to the page before processing. A step that has nothing to show (e.g. `/preview` before any processing, or after a page reload, since files only live in memory) redirects to `/upload`.

## Languages
The page must be available in Spanish and English, with a language toggle at the top right of the page. Spanish is the default language.
