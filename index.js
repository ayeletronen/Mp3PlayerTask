const player = {//player-an object. songs-an array. each song- an object. id-key in each song object. 
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + secToMin(song.duration)+".")
  },
}

//real functions
function playSong(id)
{
  return player.playSong(getSongById(id))//play the song with the given ID using getSongById function
}
function removeSong(id)
{
  if(!isIdInSongs(id))
  {
    throw "id is not existing"; //throw an error if id isnt in songs
  } 
  let song = getSongById(id)
  let index = player.songs.indexOf(song)
  player.songs.splice(index,1)
  for(let j=0 ; j<player.playlists.length ; j++)
  {
    for(let k=0 ; k<player.playlists[j].songs.length ; k++)
    {
      if(player.playlists[j].songs[k]===id)
      {
      player.playlists[j].songs.splice(k,1)//Removes the song with the given ID from the player
      }
    }

  }
}
function addSong(title, album, artist, duration, id = 8) 
{
  if(isIdInSongs(id))
  {
    throw "id is taken"; //if id is already exist - throw an error
  }
  let newDur = duration.split(":");
  let min = (Number(newDur[0]))*60;
  let sec = Number(newDur[1]);
  let dur = min+sec;
  let newSong = {
    "id": id,
    "title": title,
    "album": album,
    "artist": artist,
    "duration": dur}
  player.songs.push(newSong)//push the new song into songs
  return id
}
function removePlaylist(id) 
{
  if(!isIdInPlaylists(id))
  {
    throw "id is not existing"; //if id isnt exist - throw an error
  } 
  for(let m=0 ; m<player.playlists.length ; m++)
  {
    if(player.playlists[m].id===id)
    {
      delete player.playlists[m];//if the given playlist is exist, delete it 
      player.playlists.length--;
    }
  }
}
function createPlaylist(name, id=5) 
{
  if(isIdInPlaylists(id))
  {
    throw "id is taken"; //if id is already taken - throw an error
  }
  let newPlaylist = {};//Create a new empty playlist
  newPlaylist = {"id": id, "name": name, "songs":[]};
  player.playlists.push(newPlaylist);//push the new playlist to playlists
  return id
}
function playPlaylist(id) 
{
  if(!isIdInPlaylists(id))
  {
    throw "id is not existing"; //if the id isnt exist - throw an error
  }
  for(let p = 0 ; p < player.playlists.length ; p++) 
    if(player.playlists[p]["id"]===id)
    {
      for(let n = 0 ; n < player.playlists[p].songs.length ; n++)
      {
        playSong(player.playlists[p].songs[n])//Plays all songs in the specified playlist
      }
    }
}
function editPlaylist(playlistId, songId) 
{
  if(!isIdInSongs(songId)||!isIdInPlaylists(playlistId))
  {
    throw "id is not existing"; //throw an error if playlistId or songId does not exist
  }
  for(let q=0 ; q<player.playlists.length ; q++)
  {
    if(player.playlists[q]["id"]===playlistId)
    {
      if(!player.playlists[q]["songs"].includes(songId))
      {
        player.playlists[q]["songs"].push(songId)// if the song doesntexist in the playlist it adds it
      }
      else if(player.playlists[q]["songs"].length===1 && player.playlists[q]["songs"][0]===songId)      
      {
        player.playlists.splice(q,1); //if the playlist only includes this song, delete also thep laylist.
      }
      else
      {
        for(let r=0 ; r<player.playlists[q]["songs"].length ; r++)
        {
          if(player.playlists[q]["songs"][r]===songId)
          {
            player.playlists[q]["songs"].splice(r,1);//if thesong exist in the playlist, delete it
          }
        }
      }
    }
  }
  return player.playlists
}
function playlistDuration(id) 
{
  let total = 0
  for(let s = 0 ; s<player.playlists.length ; s++)
  {
    if(id===player.playlists[s].id)
    {
      for(let t = 0 ; t<player.playlists[s].songs.length ; t++)
      {
        for(let u = 0 ; u<player.songs.length ; u++)
        {
          if(player.songs[u].id===player.playlists[s].songs[t])
          {
            total+= player.songs[u].duration;
          }
        }
      }
    }
  }
  return total;//Returns the total duration of the entire playlist with the given ID.
}
function searchByQuery(query) 
{
  newQuery = query.toLowerCase()
  let results = {"songs": [], "playlists": []}
  for(let v = 0 ; v<player.songs.length ; v++)
  {
    if(player.songs[v].title.toLowerCase().includes(newQuery) || player.songs[v].artist.toLowerCase().includes(newQuery) || player.songs[v].album.toLowerCase().includes(newQuery)) {
      results.songs.push(player.songs[v])//if the songs attributes indludes the query, add it to results
      results.songs.sort(compare)
    }
  }
  for(let w = 0 ; w<player.playlists.length ; w++)
  {
    if(player.playlists[w].name.toLowerCase().includes(newQuery))
    {
      results.playlists.push(player.playlists[w])//if the playlists name indludes the query, add it to results
      results.playlists.sort(compare2)
    }
  }
  return results//Returns a results object
}
function searchByDuration(duration) 
{
  let newDur = duration.split(":");//func min to sec(duration)
  let min = (Number(newDur[0]))*60;
  let sec = Number(newDur[1]);
  let dur = min+sec;
  let mini1 = Infinity
  let mini2 = Infinity
  let index1  
  let index2  
  for(let i = 0 ; i<player.songs.length ; i++)
  {  
    if(Math.abs(dur-player.songs[i]["duration"])<mini1)
    {
      mini1 = Math.abs(dur-player.songs[i]["duration"]);
      index1 = i;
    }
  }
  for(let j = 0 ; j<player.playlists.length ; j++)
  {
    let sum = playlistDuration(player.playlists[j]["id"])
    if(Math.abs(sum-dur)<mini2)
    {
      mini2 = (Math.abs(sum-dur))
      index2 = j
    }
  }
  if(mini1<mini2)//Returns the song, or playlist, with the closest duration to what was given
  {
    return player.songs[index1]
  }
  else
  {
    return player.playlists[index2]
  } 
}
//helpers
function compare2( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
}
function compare( a, b ) {
  if ( a.title < b.title ){
    return -1;
  }
}
function secToMin(duration){
  let min = Math.floor(duration/60)
  let sec = duration%60
  if(min<10 && sec<10){
    return "0"+min +":"+ "0"+sec
  }else if (min<10){
    return "0"+min +":"+sec
  }
  else if (sec<10) {
    return min +":"+ "0"+sec
  }
  else{
    return min +":"+ sec
  }
}
function getSongById(id){
  for(let i=0 ; i<player.songs.length ; i++){
    if(player.songs[i]["id"]===id){
      return player.songs[i]
    }
  }
}
function isIdInSongs(id){
  let x = false
  for(let i of player.songs)
  {
    if(i["id"]===id)
    {
      x = true
    }
  }
  return x
}
function isIdInPlaylists(id)
{
  let x = false
  for(let i of player.playlists)
  {
    if(i["id"]===id)
    {
      x = true
    }
  }
  return x
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
