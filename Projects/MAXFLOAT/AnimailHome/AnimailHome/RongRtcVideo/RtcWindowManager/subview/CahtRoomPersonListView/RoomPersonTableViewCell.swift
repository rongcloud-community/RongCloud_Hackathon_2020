//
//  RoomPersonTableViewCell.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/29.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class RoomPersonTableViewCell: UITableViewCell {

    @IBOutlet weak var imgV: UIImageView!
    
    @IBOutlet weak var nameLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgV.layer.cornerRadius = 15
        imgV.layer.masksToBounds = true
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
