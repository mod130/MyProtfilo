import { useEffect, useRef, useState } from 'react';

/**
 * Cycles through a list of words with a typing / deleting animation.
 * Falls back to simply showing the first word if the user prefers reduced motion.
 */
export function useTypewriter(words, { typingSpeed = 75, deletingSpeed = 40, pauseTime = 1800 } = {}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion.current) {
      setText(words[0] || '');
    }
  }, [words]);

  useEffect(() => {
    if (prefersReducedMotion.current || !words || words.length === 0) return undefined;

    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const nextText = isDeleting ? currentWord.slice(0, text.length - 1) : currentWord.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(nextText), isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
