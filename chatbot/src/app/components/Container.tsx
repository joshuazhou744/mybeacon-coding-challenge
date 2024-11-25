
interface Props {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function Container({title, description, children}: Props) {
  return (
    <div>
      <h1>{title}</h1>
        <div>
            <p>{description}</p>
            {children}
        </div>
    </div>
  )
}
