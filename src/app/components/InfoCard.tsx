type Card = {
  title: string;
  content: string;
};

export function InfoCard(card: Card) {
  return (
    <div className="mx-2 h-auto rounded bg-gray-200 font-mono tracking-tight text-black ring-2 ring-gray-300 dark:bg-gray-600 dark:text-white dark:ring-gray-700">
      <span className="flex bg-gray-300 pb-1 pl-2 text-2xl dark:bg-gray-700">
        {card.title}
      </span>
      <span className="flex py-2 pl-2 text-base">{card.content}</span>
    </div>
  );
}
