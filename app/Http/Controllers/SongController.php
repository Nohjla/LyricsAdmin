<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\SongService;
use Illuminate\Support\Facades\Auth;

class SongController extends Controller
{
    private $oSongService;

    /**
     * SongController constructor.
     * @param SongService $oSongService
     */
    public function __construct(SongService $oSongService)
    {
        $this->oSongService = $oSongService;
        $this->middleware('auth');
    }

    public function get($id)
    {
        $oReturn = $this->oSongService->getById($id);
        return response()->json($oReturn);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'artist' => 'required',
            'lyrics' => 'required',
        ]);
        $aData = $request->all();
        $oReturn = $this->oSongService->insert($aData);

        return response()->json($oReturn);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $oReturn = $this->oSongService->get();
        return response()->json($oReturn);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $iId = $request->input('update-id');
        $aData = [
            'title'  => $request->input('title'),
            'artist' => $request->input('artist'),
            'lyrics' => $request->input('lyrics')
        ];
        $oReturn = $this->oSongService->update($iId, $aData);
        return response()->json($oReturn);

    }

    public function delete($id)
    {
        $oReturn = $this->oSongService->delete($id);
        return response()->json($oReturn);
    }

}
