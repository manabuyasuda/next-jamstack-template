import Link from "next/link"

const NewsNav = (props) => {
  const { years } = props;

  return (
    <ol>
      {years.map(year => (
        <li key={`${year}`}>
          <Link href={`/news/archive/${year}/`}><a>{year}</a></Link>
        </li>
      ))}
    </ol>
  )

}

export default NewsNav