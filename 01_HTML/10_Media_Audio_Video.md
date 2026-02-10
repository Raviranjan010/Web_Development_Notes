# 1.10 HTML Media (Audio & Video)

## 1. What is it?
HTML5 introduced dedicated tags to embed multimedia files natively, without needing plugins like Flash (RIP).

## 2. Why it is used?
- **Audio**: Music players, podcasts, sound effects.
- **Video**: Tutorials, promotional clips, background videos.
- **Iframes**: Embedding external content like YouTube videos or Google Maps.

## 3. Syntax / Structure
```html
<video src="movie.mp4" controls></video>

<audio src="song.mp3" controls></audio>
```

## 4. Detailed Explanation

### Common Attributes for Audio/Video
- `controls`: Displays play/pause buttons, volume, and seek bar. **Essential** for user experience.
- `autoplay`: Starts playing automatically (often blocked by browsers unless muted).
- `loop`: Replays the media when it ends.
- `muted`: Starts with sound off.
- `poster` (Video only): An image shown before the video plays (thumbnail).

### Supporting Multiple Formats
Different browsers support different file formats. We use the `<source>` tag to provide fallbacks.

## 5. Examples

### Audio Player
```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

### Video Player with Poster
```html
<video width="400" controls poster="thumbnail.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
```

### Embedding YouTube (Iframe)
Since hosting videos is expensive/bandwidth-heavy, we often embed them.
```html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

## 6. Key Points to Remember
- Always include `controls` unless you are building a custom player with JavaScript. Users hate audio that plays without a way to stop it.
- Autoplay policy: Modern browsers block autoplay videos with sound. If you want autoplay background video, you must add `muted`.
  ```html
  <video autoplay loop muted playsinline>...</video>
  ```

## 7. Common Mistakes
- **Mistake**: Providing only one format (e.g., just `.mov`).
  **Fix**: Always provide standard formats. `.mp4` (H.264) is the most widely supported for video, `.mp3` for audio.

## 8. Pro Tips / Tricks
- **Responsive Iframes**: YouTube embeds are not responsive by default. Wrap the iframe in a `div` and use CSS `aspect-ratio` or padding hacks to make it scale correctly on mobile.
- **Track Element**: You can add subtitles/captions to your videos using `<track>`.
  ```html
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
  ```

## 9. Related Topics
- [05_Links_and_Images.md](./05_Links_and_Images.md) - Embedding static visuals.
- [../02_CSS/12_Responsive_Design.md](../02_CSS/12_Responsive_Design.md) - Making embeds fit mobile screens.
