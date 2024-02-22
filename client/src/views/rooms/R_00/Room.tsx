
import React from 'react';
import "./Everest.css";

const Room = () => {

    return (
        <div className="Room Everest Sketch">
            <iframe
                src={"https://everest-pipkin.com/projects/soft_corruptor/"}
                width={"100%"}
                height={"100%"}
            />
        </div>
    )
    // return (
    //     <div className="Room Sketch">
    //         <div className="Everest">
    //             <br />
    //             <br />
    //             <br />
    //             <div className="titleEl"><strong>soft corruptor</strong></div>

    //             <hr />
    //             <br /><br />
    //             <details>
    //                 <summary>when i was in the 3rd grade</summary>
    //                 <details>
    //                     <summary>i convinced my friend's older sister to loan me her gameboy color</summary>
    //                     <details>
    //                         <summary><em>with</em> pokemon blue</summary>
    //                         <details>
    //                             <summary>on the one condition</summary>
    //                             <details>
    //                                 <summary>that i never save over her file.</summary>
    //                                 <br />
    //                                 <details>
    //                                     <summary> this was contraband; my parents couldn't know</summary>
    //                                     <details>
    //                                         <summary> i smuggled that gameboy home and kept it inside my pillowcase, turning it on</summary>
    //                                         <details>
    //                                             <summary> at an almost imperceptible volume</summary>
    //                                             <details>
    //                                                 <summary> after i’d been put to bed for the night.</summary>
    //                                                 <details>
    //                                                     <summary> i would play until the batteries died or i fell asleep or it was time for school</summary>
    //                                                     whatever came first.<br /><br />
    //                                                 </details>
    //                                             </details>
    //                                         </details>
    //                                     </details>

    //                                     <details>
    //                                         <summary> because of my promise to never save, i had, generally, somewhere between 6 and 10 hours to beat the game</summary>
    //                                         <details>
    //                                             <summary> that year, the margins of my schoolwork filled with (what i would later learn were) 'speedrun strats'</summary>
    //                                             <details>
    //                                                 <summary> i wrote down what patch of grass would come up with a pikachu</summary>
    //                                                 <details>
    //                                                     <summary> traced my routes through the caves</summary>
    //                                                     <details>
    //                                                         <summary> memorized the dialog,</summary>
    //                                                         <details>
    //                                                             <summary> then the buttons to skip through it</summary>
    //                                                             <details>
    //                                                                 <summary> learned i could invert the screen and navigate dark caverns without teaching my pokemon "flash"</summary>
    //                                                                 <details>
    //                                                                     <summary> eventually, i didn't need to invert anything</summary>
    //                                                                     i just knew where to walk, in the dark.<br /><br />
    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>
    //                                                     </details>
    //                                                 </details>
    //                                             </details>
    //                                         </details>

    //                                         <details>
    //                                             <summary> i <em>was</em> angling for the elite four, the ostensible win condition of pokemon</summary>
    //                                             <details>
    //                                                 <summary> but i often stopped at cinnabar island</summary>
    //                                                 <details>
    //                                                     <summary> this is because if you surfed up and down the coastline off cinnabar</summary>
    //                                                     <details>
    //                                                         <summary> you might meet MissingNo.</summary>

    //                                                         <details>
    //                                                             <summary> missingno is a data buffer glitch, and a famous one at that</summary>
    //                                                             <details>
    //                                                                 <summary> it appears when the game mistakenly substitutes the player's name as a pokemon id</summary>
    //                                                                 <details>
    //                                                                     <summary> forming a scrambled, glitchy block described as a "bird/normal" pokemon</summary>
    //                                                                     <details>
    //                                                                         <summary> (although occasionally appearing as a ghost or a fossil unseen elsewhere in the game)</summary>
    //                                                                         <img src="https://everest-pipkin.com/projects/soft_corruptor/missingno.png" className="indent" /><br /><br />
    //                                                                     </details>
    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>

    //                                                         <details>
    //                                                             <summary> summoning a ghost was reason enough to try for missingno, but it also came with side-effects</summary>
    //                                                             <details>
    //                                                                 <summary> (including a useful error that would copy an item 128 times over)</summary>
    //                                                                 <details>
    //                                                                     <summary> but rumor was, catching missingno was dangerous-</summary>
    //                                                                     <details>
    //                                                                         <summary>it could softlock the game.</summary>
    //                                                                         <details>
    //                                                                             <summary>destroy your save file.</summary>
    //                                                                             delete pokemon out of your party.<br /><br />
    //                                                                         </details>
    //                                                                     </details>

    //                                                                     <details>
    //                                                                         <summary> none of this was true, but we traded these stories around the playground, whispered about our angry ghosts</summary>
    //                                                                         <details>
    //                                                                             <summary> and there were other phantoms;</summary>
    //                                                                             <details>
    //                                                                                 <summary> invisible computers</summary>
    //                                                                                 <details>
    //                                                                                     <summary> a teleporting man stuck on roof</summary>
    //                                                                                     <details>
    //                                                                                         <summary> swapped overworld tiles</summary>
    //                                                                                         <details>
    //                                                                                             <summary> a trick to catch the most elusive pokemon of all, mew</summary>
    //                                                                                             <details>
    //                                                                                                 <summary> a way to visit glitch city</summary>

    //                                                                                                 <details>
    //                                                                                                     <summary><br /> glitch city was a place made of scrambled sprites</summary>
    //                                                                                                     <details>
    //                                                                                                         <summary> where menu items and objects and sections of buildings melted into one another</summary>
    //                                                                                                         <details>
    //                                                                                                             <summary> forming an ornate, broken map</summary>
    //                                                                                                             <details>
    //                                                                                                                 <summary> you could stand in glitch city, but you couldn't move</summary>
    //                                                                                                                 <details>
    //                                                                                                                     <summary> i tried everything, every button press order and screen inversion and quit-restart scenario</summary>
    //                                                                                                                     <details>
    //                                                                                                                         <summary> stuck on a single tile, the character walked morosely as if into a wall</summary>
    //                                                                                                                         <details>
    //                                                                                                                             <summary> but it was still, materially there</summary>
    //                                                                                                                             <details>
    //                                                                                                                                 <summary> i could see it</summary>
    //                                                                                                                                 <details>
    //                                                                                                                                     <summary> just beyond my reach</summary>
    //                                                                                                                                     <img src="https://everest-pipkin.com/projects/soft_corruptor/glitchcity.png" className="indent" /><br /><br />
    //                                                                                                                                 </details>
    //                                                                                                                             </details>
    //                                                                                                                         </details>
    //                                                                                                                     </details>
    //                                                                                                                 </details>
    //                                                                                                             </details>
    //                                                                                                         </details>
    //                                                                                                     </details>
    //                                                                                                 </details>
    //                                                                                             </details>
    //                                                                                         </details>
    //                                                                                     </details>
    //                                                                                 </details>
    //                                                                             </details>
    //                                                                         </details>
    //                                                                     </details>

    //                                                                     <details>
    //                                                                         <summary> although i eventually had to give back the gameboy</summary>
    //                                                                         <details>
    //                                                                             <summary> i did have one friend with a playstation and spyro the dragon</summary>

    //                                                                             <details>
    //                                                                                 <summary> unlike pokemon, which uses memory manipulation to step out of bounds</summary>
    //                                                                                 <details>
    //                                                                                     <summary> spyro is 3d, with simulated physics and barriers</summary>
    //                                                                                     <details>
    //                                                                                         <summary> this means that you can <em>see</em> outside</summary>
    //                                                                                         <details>
    //                                                                                             <summary> it is right there</summary>
    //                                                                                             <details>
    //                                                                                                 <summary> over an invisible wall that rings the world</summary><br />

    //                                                                                                 <details>
    //                                                                                                     <summary> see me: 9 years old,</summary>
    //                                                                                                     <details>
    //                                                                                                         <summary> inviting myself for a playdate,</summary>
    //                                                                                                         <details>
    //                                                                                                             <summary> insisting we play spyro,</summary>
    //                                                                                                             <details>
    //                                                                                                                 <summary> and then,</summary>
    //                                                                                                                 <details>
    //                                                                                                                     <summary> over and over again,</summary>
    //                                                                                                                     <details>
    //                                                                                                                         <summary> trying to bump my way out into the blue.</summary><br />

    //                                                                                                                         <details>
    //                                                                                                                             <summary> recently, i found a video of someone doing exactly this;</summary>
    //                                                                                                                             <details>
    //                                                                                                                                 <summary> making a sort of hopskip into the atmosphere</summary>
    //                                                                                                                                 <details>
    //                                                                                                                                     <summary> one-sided, the geometry of the world turns transparent</summary>
    //                                                                                                                                     <details>
    //                                                                                                                                         <summary> as the dragon spirals down, gliding under the level</summary>
    //                                                                                                                                         <details>
    //                                                                                                                                             <summary> you can see the architecture unstitch itself at the seams</summary>
    //                                                                                                                                             <details>
    //                                                                                                                                                 <summary> one purple dragon</summary>
    //                                                                                                                                                 <details>
    //                                                                                                                                                     <summary> soaring through glitch city </summary>
    //                                                                                                                                                     <iframe className="indent" src="https://www.youtube.com/embed/BMQbvtoVcLY"></iframe>
    //                                                                                                                                                 </details>
    //                                                                                                                                             </details>
    //                                                                                                                                         </details>
    //                                                                                                                                     </details>
    //                                                                                                                                 </details>
    //                                                                                                                             </details>
    //                                                                                                                         </details>
    //                                                                                                                     </details>
    //                                                                                                                 </details>
    //                                                                                                             </details>
    //                                                                                                         </details>
    //                                                                                                     </details>
    //                                                                                                 </details>
    //                                                                                             </details>
    //                                                                                         </details>
    //                                                                                     </details>
    //                                                                                 </details>
    //                                                                             </details>
    //                                                                         </details>
    //                                                                     </details>

    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>

    //                                                     </details>
    //                                                 </details>
    //                                             </details>
    //                                         </details>

    //                                     </details>

    //                                     <details>
    //                                         <summary> the house we lived in was old</summary>
    //                                         <details>
    //                                             <summary> the driveway was long</summary>
    //                                             <details>
    //                                                 <summary> it was sandwiched between a few family graveyards; my friends loved to come over, but wouldn't spend the night</summary>
    //                                                 <details>
    //                                                     <summary> sometimes we'd get out the ouija board and try to contact the beyond</summary>
    //                                                     <details>
    //                                                         <summary> generally unsuccessfully</summary><br />

    //                                                         <details>
    //                                                             <summary> once, a friend told me ghosts walk through walls because they remember the house different</summary>
    //                                                             <details>
    //                                                                 <summary> like, after a remodel or renovation</summary>
    //                                                                 <details>
    //                                                                     <summary> they run a logic of memories and can't see that the door got moved</summary>
    //                                                                     and this is why they respect the rules of floors but not of walls<br /><br />
    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>
    //                                                     </details>
    //                                                 </details>
    //                                             </details>
    //                                         </details>

    //                                         <details>
    //                                             <summary>around this time, we learned in school about the structure of atoms</summary>
    //                                             <details>
    //                                                 <summary> how 99.9999999999996% of an atom is empty air</summary>
    //                                                 <details>
    //                                                     <summary> i took this to mean that surely two atoms could be slotted together, if you tried hard enough</summary>
    //                                                     <details>
    //                                                         <summary> if you angled them right, probably you could put your hand right through the table</summary>
    //                                                         <details>
    //                                                             <summary> if you believed hard enough</summary>
    //                                                             <details>
    //                                                                 <summary> if you weren't watching</summary>
    //                                                                 if your eyes were closed<br /><br />
    //                                                             </details>
    //                                                         </details>
    //                                                     </details>
    //                                                 </details>

    //                                                 <details>
    //                                                     <summary> my teacher tried to explain that air wasn't the right way to think about it</summary>
    //                                                     <details>
    //                                                         <summary> it wasn't <em>air</em> in atoms, because air was made <em>of</em> atoms</summary>
    //                                                         <details>
    //                                                             <summary> it was just nothing</summary>
    //                                                             <details>
    //                                                                 <summary> forces, void</summary>
    //                                                                 like in space<br /><br />
    //                                                             </details>
    //                                                         </details>
    //                                                     </details>

    //                                                     <details>
    //                                                         <summary> atoms never even touch each other, our teacher said</summary>
    //                                                         <details>
    //                                                             <summary> they have a layer of repulsion</summary>
    //                                                             <details>
    //                                                                 <summary> our bodies are like a house made of unmortared stones</summary>
    //                                                                 <details>
    //                                                                     <summary> no matter how well they fit together</summary>
    //                                                                     <details>
    //                                                                         <summary> no mater how they are locked in place</summary>
    //                                                                         <details>
    //                                                                             <summary> it isn't forever</summary>
    //                                                                             the wind still gets in<br /><br />
    //                                                                         </details>
    //                                                                     </details>
    //                                                                 </details>
    //                                                             </details>

    //                                                             <details>
    //                                                                 <summary> i had a schoolyard crush on a kid who sat three desks ahead of me</summary>
    //                                                                 <details>
    //                                                                     <summary> i remember thinking, how romantic</summary>
    //                                                                     <details>
    //                                                                         <summary> if maybe</summary>
    //                                                                         <details>
    //                                                                             <summary> if we held hands</summary>
    //                                                                             <details>
    //                                                                                 <summary> if we closed our eyes</summary>
    //                                                                                 <details>
    //                                                                                     <summary> if we really <em>focused</em></summary>
    //                                                                                     <details>
    //                                                                                         <summary> we would phase a little closer</summary><br />

    //                                                                                         <details>
    //                                                                                             <summary> then stop</summary><br />

    //                                                                                             <details>
    //                                                                                                 <summary> surely with all that empty space, we could get our fingers aligned in just the right way</summary>
    //                                                                                                 <details>
    //                                                                                                     <summary> and actually touch one another.</summary><br />

    //                                                                                                     <details>
    //                                                                                                         <summary> some years later, i learned there is a name for just that</summary>
    //                                                                                                         <details>
    //                                                                                                             <summary> for when atoms touch</summary><br /> and it is called radiation poisoning.<br /><br />
    //                                                                                                         </details>
    //                                                                                                     </details>
    //                                                                                                 </details>
    //                                                                                             </details>
    //                                                                                         </details>
    //                                                                                     </details>
    //                                                                                 </details>
    //                                                                             </details>
    //                                                                         </details>
    //                                                                     </details>
    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>

    //                                                     </details>

    //                                                     <details>
    //                                                         <summary>same year as the atoms, i was gifted a history of the world-type book</summary>
    //                                                         <details>
    //                                                             <summary> one of those aspirational encyclopedias given to children at birthdays</summary>
    //                                                             <details>
    //                                                                 <summary> i can't remember reading more than a page or two</summary>
    //                                                                 <details>
    //                                                                     <summary> but on the cover was a print of the flammarion engraving</summary>

    //                                                                     <details>
    //                                                                         <summary> i faced to it me so i could see it from my bed</summary>
    //                                                                         <details>
    //                                                                             <summary> i still remember the caption;</summary>
    //                                                                             <details>
    //                                                                                 <summary> <em>"A traveller puts his head under the edge of the firmament"</em></summary>
    //                                                                                 <details>
    //                                                                                     <summary> <img src="https://everest-pipkin.com/projects/soft_corruptor/engraving.jpg" className="indent" /><br /></summary>

    //                                                                                     <details>
    //                                                                                         <summary> the traveller had found a way through</summary>
    //                                                                                         <details>
    //                                                                                             <summary> i puzzled at this in the margins of my schoolwork</summary>
    //                                                                                             <details>
    //                                                                                                 <summary> dreamed about it nights</summary>
    //                                                                                                 <details>
    //                                                                                                     <summary> tried to apply it to glitch city</summary><br />
    //                                                                                                     <details>
    //                                                                                                         <summary> sometimes the games and the dreams bled into one another</summary>
    //                                                                                                         <details>
    //                                                                                                             <summary> a pushing and floating space where the walls yielded</summary>
    //                                                                                                             <details>
    //                                                                                                                 <summary> where my character passed through the barrier</summary>
    //                                                                                                                 <details>
    //                                                                                                                     <summary> where i saw what was just beyond the edge of the surface</summary>
    //                                                                                                                     <details>
    //                                                                                                                         <summary> or the firmament</summary>
    //                                                                                                                         or both<br /><br />

    //                                                                                                                     </details>
    //                                                                                                                 </details>
    //                                                                                                             </details>
    //                                                                                                         </details>
    //                                                                                                     </details>
    //                                                                                                 </details>
    //                                                                                             </details>
    //                                                                                         </details>
    //                                                                                     </details>
    //                                                                                 </details>
    //                                                                             </details>
    //                                                                         </details>
    //                                                                     </details>
    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>
    //                                                     </details>

    //                                                     <details>
    //                                                         <summary>eventually we got the internet at home</summary>
    //                                                         <details>
    //                                                             <summary>and i discovered other kinds of games</summary>

    //                                                             <details>
    //                                                                 <summary>the resplendent wealth of roleplaying forums</summary>
    //                                                                 <details>
    //                                                                     <summary>webrings</summary>
    //                                                                     <details>
    //                                                                         <summary>diaries</summary>
    //                                                                         <details>
    //                                                                             <summary>blogs</summary>
    //                                                                             <details>
    //                                                                                 <summary>flash games</summary>
    //                                                                                 neopets<br /><br />
    //                                                                             </details>
    //                                                                         </details>
    //                                                                     </details>
    //                                                                 </details>
    //                                                             </details>

    //                                                             <details>
    //                                                                 <summary>as well as another kind of invisible wall, the view source</summary>
    //                                                                 <details>
    //                                                                     <summary> for all that i'd been grasping at the internal structure of the games i played</summary>
    //                                                                     <details>
    //                                                                         <summary> attempting to get under or around their surface</summary>
    //                                                                         <details>
    //                                                                             <summary> and access what was caught inside</summary><br />

    //                                                                             <details>
    //                                                                                 <summary> i had been stuck moving a body to do so-</summary>
    //                                                                                 <details>
    //                                                                                     <summary> the memory manipulation in pokemon</summary>
    //                                                                                     <details>
    //                                                                                         <summary> the determination to scale the world wall in spyro</summary>
    //                                                                                         <details>
    //                                                                                             <summary> even the summoning of ghosts with the ouija board</summary>
    //                                                                                             <details>
    //                                                                                                 <summary> had been done by navigating a world with a character and asking it to break</summary>
    //                                                                                                 like putting your hand against the wall and willing the atoms to let you in<br /><br />
    //                                                                                             </details>
    //                                                                                         </details>
    //                                                                                     </details>
    //                                                                                 </details>

    //                                                                                 <details>
    //                                                                                     <summary> but view source-</summary>
    //                                                                                     <details>
    //                                                                                         <summary> it was all there</summary>

    //                                                                                         <details>
    //                                                                                             <summary> like picking up the shell and seeing the hermit crab</summary><br />

    //                                                                                             <details>
    //                                                                                                 <summary> i could <em>read</em> it</summary>
    //                                                                                                 <details>
    //                                                                                                     <summary> i could see how it was put together</summary>

    //                                                                                                     <details>
    //                                                                                                         <summary> and most importantly</summary>
    //                                                                                                         <details>
    //                                                                                                             <summary> i could break it into pieces</summary>
    //                                                                                                             and let myself in

    //                                                                                                         </details>
    //                                                                                                     </details>
    //                                                                                                 </details>
    //                                                                                             </details>
    //                                                                                         </details>
    //                                                                                     </details>
    //                                                                                 </details>
    //                                                                             </details>
    //                                                                         </details>
    //                                                                     </details>
    //                                                                 </details>
    //                                                             </details>
    //                                                         </details>
    //                                                     </details>

    //                                                 </details>

    //                                             </details>

    //                                         </details>
    //                                     </details>
    //                                 </details>
    //                             </details>
    //                         </details>
    //                     </details>
    //                 </details>
    //             </details>
    //             <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    //         </div>
    //     </div>
    // )
};

export default Room;
