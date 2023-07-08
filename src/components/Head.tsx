import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
};

export default function Head({ title }: Props): React.JSX.Element {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
