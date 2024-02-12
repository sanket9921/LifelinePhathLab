(function ($) {
  "use strict";
  $(function () {
    function previewImage(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#preview-image").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    // Event listener for file input change
    $("#photo-input").change(function () {
      previewImage(this);
    });

    // Event listeners for drag and drop
    $("#preview-container")
      .on(
        "drag dragstart dragend dragover dragenter dragleave drop",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
        }
      )
      .on("dragover dragenter", function () {
        $(this).addClass("hover");
      })
      .on("dragleave dragend drop", function () {
        $(this).removeClass("hover");
      })
      .on("drop", function (e) {
        let droppedFiles = e.originalEvent.dataTransfer.files;
        $("#photo-input").prop("files", droppedFiles);
        previewImage($("#photo-input")[0]);
      });
  });
})(jQuery);
