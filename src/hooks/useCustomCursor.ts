import { useEffect } from 'react';

const useCustomCursor = () => {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursorDot = document.createElement('div');
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.backgroundColor = '#38BDF8'; // primary color
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '9999';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    cursorDot.style.transition = 'width 0.2s, height 0.2s';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.style.position = 'fixed';
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.borderRadius = '50%';
    cursorOutline.style.border = '2px solid rgba(56, 189, 248, 0.5)'; // primary color with alpha
    cursorOutline.style.pointerEvents = 'none';
    cursorOutline.style.zIndex = '9999';
    cursorOutline.style.transform = 'translate(-50%, -50%)';
    cursorOutline.style.transition = 'width 0.3s, height 0.3s, border-color 0.3s, transform 0.1s linear';
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };
    
    const animateOutline = () => {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateOutline);
    }

    const onMouseEnter = () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    };

    const onMouseLeave = () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    };

    const handleHover = () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'rgba(56, 189, 248, 1)';
    };

    const handleUnhover = () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'rgba(56, 189, 248, 0.5)';
    };

    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });
    
    requestAnimationFrame(animateOutline);

    return () => {
      cursorDot.remove();
      cursorOutline.remove();
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);
};

export default useCustomCursor;
