import { default as screenShot } from "html2canvas";
import { Options as CloneOptions } from "html2canvas";

export declare type Options = CloneOptions & {
  type?: "dataURL";
};

// 重置video背景图
function resetVideo(videos, originalVideos) {
  for (let i = 0, len = videos.length; i < len; i++) {
    const video = videos[i];

    video.style.backgroundImage =
      originalVideos.get(`video_${i}`).backgroundImage || "none";
    video.style.backgroundSize =
      originalVideos.get(`video_${i}`).backgroundSize || "auto";
  }
}

export const html2canvas = async (
  element: HTMLElement,
  options?: Partial<Options>
) => {
  const { type = "dataURL" } = options;
  let originalVideos = new Map();
  let videos: NodeListOf<HTMLVideoElement> = null;

  try {
    videos = element.querySelectorAll("video");

    for (let i = 0, len = videos.length; i < len; i++) {
      const video = videos[i];

      originalVideos.set(`video_${i}`, {
        backgroundImage: video.style.backgroundImage,
        backgroundSize: video.style.backgroundSize,
      });

      try {
        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // @ts-ignore
        canvas.style = video.style;

        // 重点： 设置当前画面为video背景
        video.style.backgroundImage = `url(${canvas.toDataURL("image/jpeg")})`;
        video.style.backgroundSize = "cover";
      } catch (err) {
        continue;
      }
    }

    const canvas = await screenShot(element, options);

    resetVideo(videos, originalVideos);

    if (type && type === "dataURL") {
      return canvas.toDataURL("image/jpeg");
    } else {
      return canvas;
    }
  } catch (err) {
    resetVideo(videos, originalVideos);
    return Promise.reject(err);
  }
};
