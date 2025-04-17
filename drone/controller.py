import random

def dispatch_drone(location_lat, location_long):
    """
    Simulates a drone dispatch with location data.
    In real-world use, integrate with DJI SDK or real drone API.
    """
    print(f"Dispatching drone to location: ({location_lat}, {location_long})")

    # Simulated video stream link
    video_url = f"https://drone.stream/{random.randint(1000,9999)}"
    return {
        "status": "dispatched",
        "video_url": video_url
    }
