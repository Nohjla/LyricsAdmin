<?php

namespace App\Service;

use App\Models\Song;

class SongService
{
    private $oSongModel;

    public function __construct(Song $oSongModel)
    {
        $this->oSongModel = $oSongModel;
    }

    public function insert($aData)
    {
        return $this->oSongModel->firstOrCreate($aData);
    }

    public function update($iId, $aColumns)
    {
        return $this->oSongModel->where('id', $iId)->update($aColumns);
    }

    public function delete($iId)
    {
        return $this->oSongModel->where('id', '=', $iId)->delete();
    }

    public function get()
    {
        return $this->oSongModel->get();
    }

    public function getById($iId)
    {
        return $this->oSongModel->findOrFail($iId);
    }

}