let coordinatesElement;
let coords;

// Create EventSource for SSE endpoint
let eventSource;

function getStateFromSSE(url, options, eventName){
    eventSource = new EventSource(url, options);
    console.log(eventSource.readyState);

    coordinatesElement = document.getElementById('coordinates');

    eventSource.onopen = (e) => {
        console.log(e);
        console.log(`${eventSource.readyState} EventSource connected`);
        coordinatesElement.innerText = ''
    }

    eventSource.onclose = () => {
        console.log(`${eventSource.readyState} EventSource disconnected`);
    }

    eventSource.onerror = (error) => {
        console.error(`${error} EventSource failed`);
        eventSource.close();
    }

    eventSource.onmessage = (event) => {
        console.log(event.data);
        coords = JSON.parse(event.data);
        updateCoordinates(coords);
    }

    eventSource.addEventListener(eventName, function (event) {
        coords = JSON.parse(event.data);

        if(coords.state === 1){
            updateCoordinates(coords);
        }
        else{
            eventSource.close();
        }
    });

    function updateCoordinates(coordinates) {
        const paragraph = document.createElement('p');
        paragraph.textContent = `Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`;
        coordinatesElement.appendChild(paragraph);
    }
}

