  let webcam, labelContainer, detector;

    init();

    // Load the image model and setup the webcam
    async function init() {

	const model = handPoseDetection.SupportedModels.MediaPipeHands;
	const detectorConfig = {
	  runtime: 'mediapipe', // or 'tfjs',
	  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
	  modelType: 'lite'
	}
	detector = await handPoseDetection.createDetector(model, detectorConfig);	

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

	const skipCount = 5;
	let frameCount = 0;

    // run the webcam image through the image model
  async function predict() {
	if(frameCount % skipCount == 0)
	{
		const hands = await detector.estimateHands(webcam.canvas);
		//console.log(hands);

		if(hands.length == 0)
			labelContainer.innerHTML = "НЕ БАЧУ РУК";
		else
		{
			if(hands[0].handedness == "Left")
				labelContainer.innerHTML = "БАЧУ ЛІВУ РУКУ<br><br>";
			else
				labelContainer.innerHTML = "БАЧУ ПРАВУ РУКУ<br><br>";

			const fingerLookupIndices = {
				middleFinger: [0, 9, 10, 11, 12],
				indexFinger: [0, 5, 6, 7, 8],
				ringFinger: [0, 13, 14, 15, 16],
				pinky: [0, 17, 18, 19, 20],
				thumb: [0, 1, 2, 3, 4],
			};

			const fingers = Object.keys(fingerLookupIndices);

			for(let i=0;i<fingers.length;i++){
				const finger = fingers[i];
				const points = fingerLookupIndices[finger].map(idx => hands[0].keypoints[idx]);
				const fingerLength = Math.hypot(points[0].x - points[3].x, points[0].y - points[3].y);
				const adjacent = Math.hypot(points[0].x - points[2].x, points[0].y - points[2].y);
				const opposite = Math.hypot(points[1].x - points[2].x, points[1].y - points[2].y);
				const angle = Math.atan2(opposite, adjacent);
				const degrees = angle * 180 / Math.PI;
				labelContainer.innerHTML += "КУТ МІЖ ПАЛЬЦЯМИ " + finger + ": " + degrees.toFixed(2) + " ГРАДУСІВ<br>";
			}
		}
	}

	frameCount++;
}
