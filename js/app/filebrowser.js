define(function(require) {

	var fileBrowser = function() {
		window.console.log('loading filebrowser...');

		var fileList = [],
			$fileAttachmentsList = $('.file-collection').find('ul'),
			holder = document.getElementById('holder'),
			state = document.getElementById('status');

		if (typeof window.FileReader === 'undefined') {
			state.className = 'fail';
		} else {
			state.className = 'success';
			state.innerHTML = 'File API & FileReader available';
		}

		function destroyFileListItem(){
			$('.destroy').on('click', function(e) {
				var index = $(e.target).parent('li').index();
				$(e.target).parent('li').detach();
				fileList.splice(index, 1);
			});
		}

		function createFileListItem(file, bgImg) {
			fileList.push(file);

			if (bgImg != null) {
				$fileAttachmentsList.append('<li><span class="thumbnail" style="background-image:url('+bgImg+')"></span><span class="file-name">'+ file.name +'</span>\t<span class="file-size">Size: '+ file.size +'K</span><span class="destroy">X</span></li>');
			}
			else {
				$fileAttachmentsList.append('<li><span class="thumbnail"></span><span class="file-name">'+ file.name +'</span>\t<span class="file-size">Size: '+ file.size +'K</span><span class="destroy">X</span></li>');
			}
			destroyFileListItem();
			// window.console.log("createFileListItem:", fileList.length, fileList);
			window.console.log('bgImg: ', bgImg);
		}



		holder.ondragover = function() { this.className = 'hover'; return false; };
		holder.ondragend = function() { this.className = ''; return false; };
		holder.ondrop = function(e) {
			this.className = '';
			e.preventDefault();

			var file = e.dataTransfer.files[0],
				fileType = file["type"],
				validImageTypes = ["image/gif", "image/jpeg", "image/png"],
				reader = new FileReader();
			reader.onload = function(event) {
				console.log("eeee: ",event.target);
				holder.style.background = 'url(' + event.target.result + ') no-repeat center';
				var bgImg = event.target.result;

				if ($.inArray(fileType, validImageTypes) < 0) {
					// invalid file type code goes here.
					bgImg = null;
				}

				createFileListItem(file, bgImg);

			};
			//console.log(file_list.length, file_list);
			reader.readAsDataURL(file);

			return false;
		};
	};

	fileBrowser();

});