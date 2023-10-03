import React from 'react';

import { LiveKitRoom } from '@livekit/components-react';

export const TestPage = () => (
  <LiveKitRoom
    audio={true}
    video={false}
    screen={false}
    serverUrl={process.env.LIVEKIT_WS_URL}
    token={process.env.LIVEKIT_API_KEY}
  >
    <div>test</div>
  </LiveKitRoom>
);