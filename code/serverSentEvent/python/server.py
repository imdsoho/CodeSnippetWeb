from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import json, uvicorn
from asyncio import sleep
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def waypoints_generator():
    waypoints = open('waypoints.json')
    waypoints = json.load(waypoints)
    for waypoint in waypoints[0: 10]:
        data = json.dumps(waypoint)

        #message = f"id: \nevent: \ndata:{data}\nretry: \n\n"
        message = f"id: \nevent: ping\ndata:{data}\nretry: \n\n"
        yield message

        await sleep(1)


@app.get("/get-waypoints")
async def root():
    return StreamingResponse(waypoints_generator(), media_type="text/event-stream")


@app.get("/create_heatmap")
def create_heatmap():
    time.sleep(3)

    return "create heatmap"


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
