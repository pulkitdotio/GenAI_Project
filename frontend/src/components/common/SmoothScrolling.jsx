import { useEffect, useLayoutEffect, useRef } from 'react';
import { ScrollRestoration, useLocation } from 'react-router';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function SmoothScrolling() {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;

    const destroy = () => {
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const configure = () => {
      destroy();
      // Native scrolling, with no wheel interception, when reduced motion is on.
      if (motion.matches) return;

      const lenis = new Lenis({
        lerp: 0.18,
        autoRaf: false,
        syncTouch: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
        prevent: (node) => Boolean(node.closest(
          'form, input, textarea, select, [contenteditable="true"], [role="dialog"], dialog, [data-lenis-prevent], .sidebar, .app-shell'
        )),
      });
      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    configure();
    motion.addEventListener('change', configure);
    return () => {
      motion.removeEventListener('change', configure);
      destroy();
    };
  }, []);

  useLayoutEffect(() => {
    // ScrollRestoration's child layout effect has already set the native position.
    // Reset inertia to that position without issuing a second scroll command.
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.stop();
      lenis.start();
    }

    if (location.hash) {
      try {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.focus({ preventScroll: true });
      } catch {
        // Malformed fragments are ignored, just like a missing anchor.
      }
    }
  }, [location]);

  // One owner for new-page resets, fragment navigation and history restoration.
  return <ScrollRestoration />;
}

export default SmoothScrolling;
