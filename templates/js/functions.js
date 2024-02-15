$('#navbarToggleBtn').click(function() {  $('#navbarNav').toggleClass('show'); });

function send_query() {

        var query = $("#query").val();
        if (query.trim() === "") return;

        var chatId=Math.random().toString(36).substring(2, 10)
        var htmlQuery = marked.parse(query);
        $("#chat").append(`
        
                <div class='user_query  d-flex p-2  text-secondary'>
                        <div ><i class="fa-solid fa-user fs-4" ></i></div>
                        <div id="user-${chatId}" class="ms-2" >${htmlQuery}</div>
                </div>
                <div class='ai_answer d-flex p-2' >
                        <div> <i><img src="/images/logoOfTrape.png" alt="ai" width="40" height="40" / ></i></div>
                        <img id="spin-${chatId}"  class="ms-2" src="/images/spin1.svg"  width="40">
                        <div id="jedol-${chatId}" class="ms-2">
                                <div id="jedol-${chatId}"></div>
                        </div>
                </div>
        `);
        
        $("#query").val("Waiting ... !");

        $("#query").prop('disabled', true);

    
          $.ajax({
            url: "/query",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ query: query}),
            success: function (response) {
            
                ans = response.answer;
                var htmlContent = marked.parse(ans);
                $("#query").val("");
                $(`#jedol-${chatId}`).html(htmlContent)
                $(`#spin-${chatId}`).hide(500,function(){
                    $(`#jedol-${chatId}`).show(500, function(){
                        $("#chat").scrollTop($("#chat")[0].scrollHeight);
                    });

                })
              
                $("#query").prop('disabled', false);
                
               
            },
            error: function () {
                $(`#jedol-${chatId}`).text( "ERROR!" )
                $("#query").val("");
                $("#query").prop('disabled', false);
                $("#chat").scrollTop($("#chat")[0].scrollHeight);
            }
        });

        // 사용자가 메시지를 보낼 때도 스크롤 위치를 조정
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
}