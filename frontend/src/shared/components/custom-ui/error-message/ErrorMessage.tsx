interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return <p className="m-0 text-sm text-red-400">{message}</p>;
}
