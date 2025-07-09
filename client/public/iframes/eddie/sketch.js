const aws_url =
  "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/eddie/";
// const testurl = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/Music+in+the+Shape+of+a+Sphere.mp4"

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // ✅ Only change: rotate camera right with alpha = Math.PI / 2
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / -3.5, // alpha (horizontal rotation)
      Math.PI / 2, // beta (vertical tilt)
      200, // distance to target
      BABYLON.Vector3.Zero(), // target
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
      aws_url + "PAMhd.mp4",
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

  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
});
