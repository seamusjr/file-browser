define(function(require) {

	var fileBrowser = function() {

		var fileList = [],
			$fileAttachmentsList = $('.file-collection').find('ul'),
			holder = document.getElementById('holder'),
			state = document.getElementById('status');

		if (typeof window.FileReader === 'undefined') {
			state.className = 'fail';
		}
		else {
			state.className = 'success';
			state.innerHTML = 'File API & FileReader available';
		}

		function toggleGridOrListView() {
			$('.toggle-grid').on('click', function(e) {
				e.preventDefault();
				var $collection = $('.file-collection > ul');
				$collection.toggleClass('grid');

				if ($collection.hasClass('grid')) {
					$('.toggle-grid > span').html('list');
				}
				else {
					$('.toggle-grid > span').html('grid');
				}
			});
		}

		toggleGridOrListView();

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
				$fileAttachmentsList.append('<li><span class="thumbnail" style="background-image:url('+bgImg+')"></span><span class="file-name">'+ file.name + '</span>\t<span class="file-type">'+ file.type +'</span>\t<span class="file-size">Size: '+ file.size +'K</span><span class="destroy">X</span></li>');
			}
			else {
				$fileAttachmentsList.append('<li><span class="thumbnail"><i class="fa fa-file"></i></span><span class="file-name">'+ file.name +'</span>\t<span class="file-type">'+ file.type +'</span>\t<span class="file-size">Size: '+ file.size +'K</span><span class="destroy">X</span></li>');
			}
			destroyFileListItem();
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
				holder.style.background = 'url(' + event.target.result + ') no-repeat center';
				var bgImg = event.target.result;

				if ($.inArray(fileType, validImageTypes) < 0) {
					// invalid file type code goes here.
					bgImg = null;
				}

				createFileListItem(file, bgImg);

			};
			reader.readAsDataURL(file);

			return false;
		};

	};

	fileBrowser();

});