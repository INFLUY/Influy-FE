export class UIError extends Error {
  buttonText?: string;
  onClickHandler?: () => void;

  constructor(
    message: string,
    buttonText?: string,
    onClickHandler?: () => void
  ) {
    super(message);
    this.buttonText = buttonText;
    this.onClickHandler = onClickHandler;
  }
}
