const choices = ['D', 'T', 'T']; // Updated choices
let predictions = [];
let predictionMade = false; // Flag variable to track if prediction has been made

function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    document.getElementById('circleContainer').appendChild(circle);
}

function resetCircles() {
    const circleContainer = document.getElementById('circleContainer');
    circleContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        createCircle();
    }
    predictions = [];
    document.getElementById('predictionResult').textContent = ''; // Clear prediction result
    predictionMade = false; // Reset prediction flag
    // Reattach the event listener to predict button after resetting circles
    document.getElementById('predictButton').addEventListener('click', handlePredict);
}

function predict(choice) {
    if (predictions.length < 6) {
        const circle = document.getElementsByClassName('circle')[predictions.length];
        circle.style.backgroundColor = getColor(choice);
        circle.textContent = choice === 'Tiger' ? 'T' : choice.charAt(0); // Use the first character
        predictions.push(choice);
    }
}

function getColor(choice) {
    switch(choice) {
        case 'Dragon':
            return '#66b3ff'; // Blue
        case 'Tie':
            return '#85e085'; // Green
        case 'Tiger':
            return '#ffcc66'; // Yellow Orange
        default:
            return '#ccc'; // Default color
    }
}

function handlePredict() {
    if (predictions.length === 6 && !predictionMade) { // Check if prediction can be made and prediction flag is false
        const predictionResult = document.getElementById('predictionResult');
        const resultIndex = Math.floor(Math.random() * predictions.length);
        const result = predictions[resultIndex];

        // Determine the adjective for the prediction
        let adjective;
        switch(result) {
            case 'D':
                adjective = 'Great';
                break;
            case 'T':
                adjective = 'Interesting';
                break;
            default:
                adjective = 'Exciting';
        }

        // Construct the prediction message
        const predictionMessage = `${adjective} prediction: ${result === 'T' ? 'Tiger' : result}`;

        // Display the prediction
        predictionResult.textContent = predictionMessage;
        
        // Hide the prediction buttons
        document.getElementById('buttonContainer').style.display = 'none';
        
        // Set prediction flag to true
        predictionMade = true;

        // Remove the event listener from predict button after making the prediction
        document.getElementById('predictButton').removeEventListener('click', handlePredict);
    } else {
        // Show popup modal with error message
        const popupMessage = document.getElementById('popupMessage');
        popupMessage.textContent = "Please fill all circles before predicting or prediction has already been made.";
        const modal = document.getElementById('popupModal');
        modal.classList.add('show');

        // Close the modal when the close button is clicked
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
}

document.getElementById('dragonButton').addEventListener('click', () => predict('Dragon'));
document.getElementById('tieButton').addEventListener('click', () => predict('Tie'));
document.getElementById('tigerButton').addEventListener('click', () => predict('Tiger'));
document.getElementById('predictButton').addEventListener('click', handlePredict);
document.getElementById('resetButton').addEventListener('click', resetCircles);

resetCircles();
