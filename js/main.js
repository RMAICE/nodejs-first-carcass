$('#changeArticle').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal
	var title = button.closest('.media.col-12').find('._js-media-title').text().trim() // Extract info from data-* attributes
	var text = button.closest('.media.col-12').find('._js-media-text').text().trim() // Extract info from data-* attributes
	var id = button.closest('.media.col-12').find('._js-media-delete').data('article-id')
	var modal = $(this)

	modal.find('#articleTitle').val(title)
	modal.find('#articleText').val(text)
	modal.find('._js-article-id').data('article-id', id)
})

$('#changeArticle').on('hide.bs.modal', function (event) {
	var modal = $(this)

	modal.find('#articleTitle').val('')
	modal.find('#articleText').val('')
	modal.find('._js-article-id').data('article-id', '')
})

$('._js-media-delete').mouseup(function(e){
	let id = $(this).data('article-id')
	let data = {
		id
	}

	$.ajax({
		url: '/article',
		method: 'DELETE',
		data: data,
		success: data => {
			window.location.reload()
		}
	})
})

$('#updateArticle').submit(function(e){
	e.preventDefault()
	let data = {
		text: $(this).find('#articleText').val(),
		title: $(this).find('#articleTitle').val(),
		id: $(this).find('._js-article-id').data('article-id'),
	}

	return $.ajax({
		url: '/article',
		method: 'PUT',
		data,
		success: data => {
			window.location.reload()
		}
	})
})