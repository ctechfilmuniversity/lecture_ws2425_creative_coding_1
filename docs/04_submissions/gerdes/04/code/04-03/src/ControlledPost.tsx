import { EffectComposer, Noise, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';

const ControlledPost = () => {
  const data = useControls('post processing', {
    // noiseOpacity: {
    //   value: 0.08,
    //   min: 0,
    //   max: 1,
    //   step: 0.01,
    // },
    luminanceThreshold: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.01,
    },
    luminanceSmoothing: {
      value: 1,
      min: 0,
      max: 8,
      step: 1,
    },
    height: {
      value: 300,
      min: 0,
      max: 1000,
      step: 10,
    },
  });
  return (
    <>
      <EffectComposer>
        {/* <Noise opacity={data.noiseOpacity} /> */}
        <Bloom
          luminanceThreshold={data.luminanceThreshold}
          luminanceSmoothing={data.luminanceSmoothing}
          height={data.height}
        />
      </EffectComposer>
      ;
    </>
  );
};
export default ControlledPost;
