import { useEffect, useState, useRef, useMemo } from "react";

const DecryptText = ({
  values = ["Empty"],
  delay = 3000,
  speed = 30,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()",
}) => {
  const [result, setResult] = useState(values[0] || "");
  const intervalRef = useRef(null);
  const decryptIntervalRef = useRef(null);

  const textValues = useMemo(() => values, [values]);

  useEffect(() => {
    if (textValues.length <= 1) {
      setResult(textValues[0] || "");
      return;
    }

    let index = 1;

    const startCycle = () => {
      const targetText = textValues[index];

      if (decryptIntervalRef.current) {
        clearInterval(decryptIntervalRef.current);
      }

      let decryptIndex = 0;

      decryptIntervalRef.current = setInterval(() => {
        if (decryptIndex < targetText.length) {
          const partial =
            targetText.substring(0, decryptIndex) +
            characters[Math.floor(Math.random() * characters.length)];

          setResult(partial);
          decryptIndex++;
        } else {
          setResult(targetText);
          clearInterval(decryptIntervalRef.current);
          decryptIntervalRef.current = null;
        }
      }, speed);

      index = index === textValues.length - 1 ? 0 : index + 1;
    };

    startCycle();
    intervalRef.current = setInterval(startCycle, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (decryptIntervalRef.current) clearInterval(decryptIntervalRef.current);
    };
  }, [textValues, delay, speed, characters]);

  return <span>{result}</span>;
};

export default DecryptText;