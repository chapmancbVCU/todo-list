/* Import TinyMCE */
import tinymce from 'tinymce';

/* Default icons are required. After that, import custom icons if applicable */
import 'tinymce/icons/default';

/* Required TinyMCE components */
import 'tinymce/themes/silver';
import 'tinymce/models/dom';

/* Import a skin (can be a custom skin instead of the default) */
import 'tinymce/skins/ui/oxide/skin.css';

/* Import plugins */
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';

/* Import premium plugins */
/* NOTE: Download separately and add these to /src/plugins */
/* import './plugins/checklist/plugin'; */
/* import './plugins/powerpaste/plugin'; */
/* import './plugins/powerpaste/js/wordimport'; */

/* content UI CSS is required */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';

/**
 * This function returns the new description for a note or todo list item.
 * @returns The new description for a note or todo list item.
 */
export function getDescription() {
  return tinymce.get('editor').getContent();
}

/**
 * Initialize TinyMCE editor for editing the description of a note or todo 
 * list item.
 * @param {String} description The desciption of the note or todo list item 
 * that we want to update.
 */
export function render (description) {
  let newDescription = '';
  tinymce.init({
    selector: '.editor',
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
    toolbar: 'undo redo | bold italic backcolor | strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help',
    skin: false,
    menubar: false,
    content_css: false,
    content_style: [contentCss, contentUiCss].join('\n'),
    height: 300,
    setup: function (editor) {
      editor.on('init', function (e) {
        editor.setContent(description);
      });
    }
  });
};

export function renderOriginalInput() {
  let newDescription = '';
  tinymce.init({
    selector: '.editor',
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
    toolbar: 'undo redo | bold italic backcolor | strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help',
    skin: false,
    menubar: false,
    content_css: false,
    content_style: [contentCss, contentUiCss].join('\n'),
    height: 300,
  });
};