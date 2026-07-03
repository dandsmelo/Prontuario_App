import './titleSession.css';

interface Props {
  title: string;
  width?: string;
}

export default function TitleSession(props: Props) {
  const { title, width } = props;

  return (
    <p className="title-session" style={{ width }}>
      {title}
    </p>
  );
}
