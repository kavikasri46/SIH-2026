/**
 * Utility for client-side drone orthomosaic & aerial image compression and downscaling.
 * Reduces huge multi-megabyte images (e.g. 20MB–100MB) down to optimized sizes (< 800KB)
 * for ultra-fast deep learning inference and responsive canvas rendering.
 */

export interface CompressionResult {
  file: File;
  previewUrl: string;
  originalSizeFormatted: string;
  compressedSizeFormatted: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  savingsPercent: number;
  width: number;
  height: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export async function compressDroneImage(
  file: File,
  options: {
    maxDimension?: number;
    quality?: number;
    mimeType?: string;
  } = {}
): Promise<CompressionResult> {
  const {
    maxDimension = 1600,
    quality = 0.85,
    mimeType = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    // If not an image or if it is a binary tiff, return basic fallback
    if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|tif|tiff)$/i)) {
      const url = URL.createObjectURL(file);
      resolve({
        file,
        previewUrl: url,
        originalSizeFormatted: formatFileSize(file.size),
        compressedSizeFormatted: formatFileSize(file.size),
        originalSizeBytes: file.size,
        compressedSizeBytes: file.size,
        savingsPercent: 0,
        width: 1920,
        height: 1080,
      });
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        // Fallback if browser can't decode TIFF directly
        const url = URL.createObjectURL(file);
        resolve({
          file,
          previewUrl: url,
          originalSizeFormatted: formatFileSize(file.size),
          compressedSizeFormatted: formatFileSize(file.size),
          originalSizeBytes: file.size,
          compressedSizeBytes: file.size,
          savingsPercent: 0,
          width: 1920,
          height: 1080,
        });
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale down to maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not create canvas 2D rendering context.'));
          return;
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              const url = URL.createObjectURL(file);
              resolve({
                file,
                previewUrl: url,
                originalSizeFormatted: formatFileSize(file.size),
                compressedSizeFormatted: formatFileSize(file.size),
                originalSizeBytes: file.size,
                compressedSizeBytes: file.size,
                savingsPercent: 0,
                width,
                height,
              });
              return;
            }

            const compressedFileName = file.name.replace(/\.[^/.]+$/, '') + '_compressed.jpg';
            const compressedFile = new File([blob], compressedFileName, {
              type: mimeType,
              lastModified: Date.now(),
            });

            const previewUrl = URL.createObjectURL(blob);
            const savingsPercent = Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100));

            resolve({
              file: compressedFile,
              previewUrl,
              originalSizeFormatted: formatFileSize(file.size),
              compressedSizeFormatted: formatFileSize(blob.size),
              originalSizeBytes: file.size,
              compressedSizeBytes: blob.size,
              savingsPercent,
              width,
              height,
            });
          },
          mimeType,
          quality
        );
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
