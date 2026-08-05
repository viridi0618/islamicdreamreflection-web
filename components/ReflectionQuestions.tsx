const QUESTIONS = [
  "What exactly happened in the dream? Note the sequence, the people, and the place.",
  "How did you feel during the dream — and after you woke up?",
  "Is there something in your waking life the symbol might connect to?",
  "Did the dream repeat, or was it a single occurrence?"
];

export function ReflectionQuestions() {
  return (
    <ul className="reflect-list">
      {QUESTIONS.map((q) => (
        <li key={q}>{q}</li>
      ))}
    </ul>
  );
}
