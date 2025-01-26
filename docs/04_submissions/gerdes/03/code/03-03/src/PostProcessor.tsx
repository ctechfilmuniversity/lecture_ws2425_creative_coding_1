import { EffectComposer, Noise, Bloom } from '@react-three/postprocessing';

export default function PostProcessor() {
  return (
    <>
      <EffectComposer>
        <Noise opacity={0.02} />
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={1} height={300} />
      </EffectComposer>
      ;
    </>
  );
}
