import React from 'react';
import { ShowConfig } from '../../data/CurrentShow/ShowConfig';
import Instruction from './Instruction';

const FAQContent = () => {
    return (
        <div className="Instructions-list flexPad flex1">


            <Instruction
                title={"Move"}
                imgURL={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/arrows.jpeg"}
                details={"Click/tap on tiles or press arrow keys."}
            />

            {/* ENTERING - As I Recall */}
            {ShowConfig.link == "as-i-recall" &&
                <Instruction
                    title={"Enter Room"}
                    imgURL={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/gallery/enter.png"}
                    details={"Click/ tap (or double click) floppy disk to enter artist's room."}
                />
            }
            {/* ENTERING - Homebody */}
            {ShowConfig.link === "homebody" &&
                <React.Fragment>
                    {/* enter gallery */}
                    <Instruction
                        title={"Enter Gallery"}
                        imgURL={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/gallery_enter.png"}
                        details={"Enter the gallery through the sliding doors."}
                    />
                    {/* enter room */}
                    <Instruction
                        title={"Enter Room"}
                        imgURL={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/room_enter.png"}
                        details={"View work by entering rooms via staircases."}
                    />
                </React.Fragment>
            }

            <Instruction
                title={"Chatting"}
                imgURL={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/chat.png"}
                details={"Click a user to begin a chat or select the chat icon from the menu."}
            />

        </div>

    )
}

export default React.memo(FAQContent);
