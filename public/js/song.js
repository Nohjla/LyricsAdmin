$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var alert_message = function() {};
    alert_message.warning = function(message) {
        $('#alert_placeholder').html('<div class="alert alert-primary"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    };
    var table = $('#dataTable').DataTable({
        "columnDefs": [
            {
                "targets": 5,
                "className": "text-center"
            },
            {
                "targets": 4,
                "className": "text-center"
            },
            {
                "targets": 3,
                "className": "text-center"
            }
        ]
    });

    function getSongs(){
        $.ajax({
            url: "/songs",
            type: "GET",
            dataType: 'json',
            success: function (data) {
                data.forEach(function(element){
                    table.row.add(
                        [
                            element.id,
                            element.title,
                            element.artist,
                            '<button type="button" class="btn btn-primary viewSong" data-id="'+element.id+'" data-toggle="modal" data-target="#exampleModalLong"><i class="fas fa-music"></i></i> View</button>',
                            '<button type="button" class="btn btn-warning updateSong" data-id="'+element.id+'" data-toggle="modal" data-target="#exampleModalCenter"><i class="far fa-edit"></i> Edit</button>',
                            '<button type="button" class="btn btn-danger deleteSong" data-id="'+element.id+'"><i class="fas fa-trash-alt"></i> Danger</button>'
                        ]
                    ).draw();
                });
            },
            error: function (data) {
                console.log('Error:', data);
            },
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN', $("#token").attr('content'));}
        });
    }

    getSongs();

    $('#btnSave').click(function (e) {
        e.preventDefault();
        $(this).html('Saved');

        $.ajax({
            data: $('#createForm').serialize(),
            url: "/create",
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $('#title').val('');
                $('#artist').val('');
                $('#lyrics').val('');
                table.clear();
                getSongs();
                $('#exampleModal').modal('toggle');
                alert_message.warning('Successfully saved');
            },
            error: function (data) {
                console.log('Error:', data);
                $('#saveBtn').html('Save Changes');
            },
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN', $("#token").attr('content'));}
        });
    });

    $('#btnSaveUpdate').click(function (e) {
        e.preventDefault();
        $(this).html('Saved');

        $.ajax({
            data: $('#updateForm').serialize(),
            url: "/update",
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $('#update-id').val('');
                $('#update-title').val('');
                $('#update-lyrics').val('');
                $('#update-artist').val('');
                table.clear();
                getSongs();
                $('#exampleModalCenter').modal('toggle');
                alert_message.warning('Successfully updated');
            },
            error: function (data) {
                console.log('Error:', data);
                $('#saveBtn').html('Save Changes');
            },
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN', $("#token").attr('content'));}
        });
    });

    $('body').on('click', '.deleteSong', function () {

        var song_id = $(this).data("id");
        confirm("Are You sure want to delete !");
        $.ajax({
            type: "DELETE",
            url: "/songs"+'/'+song_id,
            success: function (data) {
                table.clear();
                getSongs();
                alert_message.warning('Successfully deleted');
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });

    $('body').on('click', '.updateSong', function () {

        var song_id = $(this).data("id");
        $.ajax({
            url: "/getSongs"+'/'+song_id,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                $('#update-id').val(data.id);
                $('#update-title').val(data.title);
                $('#update-artist').val(data.artist);
                $('#update-lyrics').val(data.lyrics);
            },
            error: function (data) {
                console.log('Error:', data);
            },
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN', $("#token").attr('content'));}
        });
    });

    $('body').on('click', '.viewSong', function () {

        var song_id = $(this).data("id");
        $.ajax({
            url: "/getSongs"+'/'+song_id,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                $('#song-title').html(data.title);
                $('#song-artist').html('Artist: '+data.artist);
                $('#song-lyircs').html(data.lyrics);
            },
            error: function (data) {
                console.log('Error:', data);
            },
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN', $("#token").attr('content'));}
        });
    });



});