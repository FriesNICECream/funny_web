/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  Image,
  MeshTransmissionMaterial,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useFBO,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { easing } from "maath";

function FluidGlass({ mode = "lens", lensProps = {}, barProps = {}, cubeProps = {} }) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides = mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;
  const {
    navItems = [{ label: "初始界面", link: "" }],
    title = "Funny Web",
    description = "登录后直接进入最大展示区。",
    imageUrls = [
      "/assets/demo/cs1.svg",
      "/assets/demo/cs2.svg",
      "/assets/demo/cs3.svg",
      "/assets/demo/cs1.svg",
      "/assets/demo/cs2.svg",
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true, antialias: true }}>
      <color attach="background" args={["#08111f"]} />
      <fog attach="fog" args={["#08111f", 16, 28]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 8]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-5, 2, 4]} intensity={12} color="#6d98ff" />
      <Suspense fallback={null}>
        <ScrollControls damping={0.2} pages={3} distance={0.4}>
          {mode === "bar" ? <NavItems items={navItems} /> : null}
          <Wrapper modeProps={modeProps}>
            <Scroll>
              <Typography title={title} description={description} />
              <Images imageUrls={imageUrls} />
            </Scroll>
            <Scroll html />
            <Preload />
          </Wrapper>
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: viewportSize } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geometry = nodes[geometryKey]?.geometry;

    if (!geometry) {
      return;
    }

    geometry.computeBoundingBox();
    geoWidthRef.current = geometry.boundingBox.max.x - geometry.boundingBox.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }

    const { gl, viewport, pointer, camera } = state;
    const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const destX = followPointer ? (pointer.x * currentViewport.width) / 2 : 0;
    const destY = lockToBottom ? -currentViewport.height / 2 + 0.2 : followPointer ? (pointer.y * currentViewport.height) / 2 : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = currentViewport.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(new THREE.Color("#08111f"), 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewportSize.width, viewportSize.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes[geometryKey]?.geometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          transmission={1}
          roughness={0}
          backside
          backsideThickness={5}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...props }) {
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...props} />;
}

function Cube({ modeProps, ...props }) {
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...props} />;
}

function Bar({ modeProps = {}, ...props }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...props}
    />
  );
}

function NavItems({ items }) {
  const group = useRef();
  const { viewport, camera } = useThree();
  const [device, setDevice] = useState(getNavDevice);
  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
  };

  useEffect(() => {
    const onResize = () => setDevice(getNavDevice());
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) {
      return;
    }

    const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -currentViewport.height / 2 + 0.2, 15.1);
    group.current.children.forEach((child, index) => {
      child.position.x = (index - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link) => {
    if (!link) {
      return;
    }

    if (link.startsWith("#")) {
      window.location.hash = link;
      return;
    }

    window.location.href = link;
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          depthWrite={false}
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          depthTest={false}
          renderOrder={10}
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images({ imageUrls }) {
  const group = useRef();
  const data = useScroll();
  const { height } = useThree((state) => state.viewport);

  useFrame(() => {
    if (!group.current) {
      return;
    }

    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1, 1]} url={imageUrls[0]} />
      <Image position={[2, 0, 3]} scale={3} url={imageUrls[1]} />
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url={imageUrls[2]} />
      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url={imageUrls[3]} />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url={imageUrls[4]} />
    </group>
  );
}

function Typography({ title, description }) {
  const [device, setDevice] = useState(getTypeDevice);
  const DEVICE = {
    mobile: { fontSize: 0.2, bodySize: 0.05 },
    tablet: { fontSize: 0.4, bodySize: 0.06 },
    desktop: { fontSize: 0.6, bodySize: 0.065 },
  };

  useEffect(() => {
    const onResize = () => setDevice(getTypeDevice());
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { fontSize, bodySize } = DEVICE[device];

  return (
    <group>
      <Text
        position={[0, 0.55, 12]}
        fontSize={fontSize}
        letterSpacing={-0.05}
        outlineWidth={0}
        outlineBlur="20%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      <Text
        position={[0, -0.15, 12]}
        maxWidth={7}
        fontSize={bodySize}
        color="#d2defb"
        anchorX="center"
        anchorY="middle"
      >
        {description}
      </Text>
    </group>
  );
}

function getNavDevice() {
  const width = window.innerWidth;

  if (width <= 639) {
    return "mobile";
  }

  if (width <= 1023) {
    return "tablet";
  }

  return "desktop";
}

function getTypeDevice() {
  return getNavDevice();
}

useGLTF.preload("/assets/3d/lens.glb");
useGLTF.preload("/assets/3d/bar.glb");
useGLTF.preload("/assets/3d/cube.glb");

export default FluidGlass;
