import { register as registerTextFlash } from "./text/TextFlash";
import { register as registerTextBlock } from "./text/TextBlock";
import { register as registerMagnetMouse } from "./interact/MagnetMouse";
import { register as registerTextBlink } from "./text/TextBlink";
import { register as registerCurveMask } from "./transition/CurveMask";
import { register as registerTextUnderline } from "./text/TextUnderline";
import { register as registerTextFloat } from "./text/TextFloat";

export function register() {
  registerTextFlash();
  registerTextBlock();
  registerMagnetMouse();
  registerTextBlink();
  registerCurveMask();
  registerTextUnderline();
  registerTextFloat();
}
