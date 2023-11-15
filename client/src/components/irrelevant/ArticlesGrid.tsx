import twelvethings from "../../assets/12-things.png";
import readtime from "../../assets/read-time.svg";
import needtocheck from "../../assets/need-to-check.png";
import sevenways from "../../assets/7-ways.png";
import topten from "../../assets/top-10.png";

const Article = ({
  title,
  img,
  desc,
  time,
  index,
}: {
  title: string;
  img: string;
  desc: string;
  time: string;
  index: number;
}): React.ReactNode => {
  return (
    <div
      className={`flex ${
        index == 0
          ? "gap-6 flex-col row-span-3 order-last"
          : "gap-8 items-center"
      }`}
    >
      <img
        className={`${
          index == 0 ? "w-full aspect-[2/1]" : "w-1/3"
        } object-cover rounded-2xl`}
        src={img}
        alt=""
      />
      <div>
        <h3
          className={`${
            index == 0 ? "text-2xl" : "text-lg"
          } capitalize text-neutral-900 font-medium"`}
        >
          {title}
        </h3>
        <p className="text-sm text-neutral-500 my-3">{desc}</p>
        <div className="flex text-sm gap-3 text-neutral-500 items-center">
          <img src={readtime} alt="" />
          {time}
        </div>
      </div>
    </div>
  );
};

const ArticlesGrid = () => {
  const articles = [
    {
      title: "12 things to know before...",
      desc: "Want to book a hotel but are unsure about what we should know, here I will try to explain what we should know and check when we want to book a hotel",
      time: "8 min read | 25 Apr 2021",
      img: twelvethings,
    },
    {
      title: "The things we need to check when staying at a hotel",
      desc: "",
      time: "4 min read | 25 Apr 2021",
      img: needtocheck,
    },
    {
      title: "7 Ways to distinguish the quality of the hotels we want to book",
      desc: "",
      time: "6 min read | 24 Apr 2021",
      img: sevenways,
    },
    {
      title: "TOP 10 HOTELS IN THE US",
      desc: "",
      time: "2 min read | 24 Apr 2021",
      img: topten,
    },
  ];

  return (
    <div className="mt-11 grid grid-flow-col grid-cols-2 grid-rows-3 gap-10 place-content-between">
      {articles.map((article, index) => (
        <Article
          key={index}
          title={article.title}
          img={article.img}
          desc={article.desc}
          time={article.time}
          index={index}
        />
      ))}
    </div>
  );
};

export default ArticlesGrid;
