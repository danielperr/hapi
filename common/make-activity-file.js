const CONTAINER_TEMPLATE = (structure, answers, filename, activityUrl) => `
<!DOCTYPE html>
<html>
  <head>
    <title>${filename}</title>
    <style>
      #container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: 999999;
      }
    </style>
  </head>
  <body>
    <iframe
      src="${activityUrl}"
      id="container"
    ></iframe>
    <script type="text/javascript">
      var container = document.getElementById('container');
      container.onload = function() {
        container.contentWindow.postMessage({
          message: 'getContent', value: {
            structure: ${structure},
            answers: ${answers},
          },
        },'*');
      };
    </script>
  </body>
</html>
`;

/**
 * Makes a container (iframe) page that links to online activity.
 * The file contains the activity structure and answers (if exist)
 * @param {Object} structure   Activity's structure
 * @param {Object} answers     Activity's answers
 * @param {Object} filename    Name of the file to be generated
 * @param {string} activityUrl URL of the activity file online
 */
export function makeActivityContainer(structure, answers, filename, activityUrl) {
  console.log({ structure, answers, filename, activityUrl });
  return CONTAINER_TEMPLATE(
    JSON.stringify(structure),
    JSON.stringify(answers || {}),
    filename,
    activityUrl,
  );
}

