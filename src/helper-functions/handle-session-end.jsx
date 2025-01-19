import { useXR } from "@react-three/xr";

function HandleSessionEnd({ showOverlay }) {
  const session = useXR((xr) => xr.session);

  if (showOverlay && session) {
    console.log(session);

    session.end();
  }
}

export default HandleSessionEnd;
