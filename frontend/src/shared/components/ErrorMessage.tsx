interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return <p className="absolute top-9/12 left-0 m-0 text-sm text-red-400">{message}</p>;
}
