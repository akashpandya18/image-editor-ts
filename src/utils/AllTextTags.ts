import { AllTextTagsProps, TextTag } from "../types";

export const AllTextTags = ({ canvasRef, allTextTags, flipHorizontal, flipVertical, id }: AllTextTagsProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  allTextTags.forEach((textTags: TextTag) => {
    context!.save();
    context!.textBaseline = "alphabetic";
    context!.font = `${textTags.size || 22}px monospace`;
    context!.fillStyle = textTags.color;
    if (flipHorizontal && !flipVertical) {
      context!.translate(textTags.textPositionX, 0);
      context!.scale(-1, 1);
      context!.fillText(textTags.text, -20, textTags.textPositionY);
    }
    if (flipVertical && !flipHorizontal) {
      context!.translate(0, textTags.textPositionY + textTags.textPositionY);
      context!.scale(1, -1);
      context!.fillText(textTags.text, textTags.textPositionX + 10, textTags.textPositionY);
    }
    if (flipVertical && flipHorizontal) {
      context!.translate(textTags.textPositionX, 0);
      context!.scale(-1, 1);
      context!.translate(0, textTags.textPositionY + textTags.textPositionY);
      context!.scale(1, -1);
      context!.fillText(textTags.text, 0, textTags.textPositionY);
    } else {
      textTags.id !== id && context!.fillText(textTags.text, textTags.textPositionX + 10, textTags.textPositionY);
    }
    context!.restore();
  });
};