const aws_url =
  "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/eddie/";
// const testurl = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/Music+in+the+Shape+of+a+Sphere.mp4"
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = (videoElement) => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / -3.5,
      Math.PI / 2,
      200,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.fov = BABYLON.Tools.ToRadians(75);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );

    const videoDome = new BABYLON.VideoDome(
      "videoDome",
      videoElement,
      {
        resolution: 32,
        size: 1000,
        autoPlay: true,
        loop: true,
      },
      scene
    );

    const music = new BABYLON.Sound(
      "Soundtrack",
      aws_url + "PAMaudio.mp3",
      scene,
      null,
      {
        loop: true,
        autoplay: true,
        volume: 0.5,
      }
    );

    return scene;
  };

  // ✅ Create hidden video element
  const video = document.createElement("video");
  video.src = aws_url + "PAMhd.mp4";
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.muted = true; // Needed to autoplay without user gesture
  video.setAttribute("playsinline", "");
  video.style.display = "none";
  document.body.appendChild(video);

  // ✅ Wait for enough buffering
  video.addEventListener("canplaythrough", () => {
    video.play(); // Safe to start
    const scene = createScene(video);
    engine.runRenderLoop(() => {
      scene.render();
    });
  });

  // Resize
  window.addEventListener("resize", () => {
    engine.resize();
  });
});
