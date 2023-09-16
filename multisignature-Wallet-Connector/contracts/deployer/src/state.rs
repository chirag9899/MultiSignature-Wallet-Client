use cw_storage_plus::{Item, Map};
use crate::msg::DeployMsg;
use cosmwasm_schema::cw_serde;

pub const DEPLOY_DATA: Item<DeployMsg> = Item::new("deploy_data");
pub const GROUP_ADDR: Item<String> = Item::new("cw4_group_addr");
pub const USER_WALLETS: Map<String, Vec<String>> = Map::new("user_wallets");

// stars1sgnzpkrw9hucpqy3xswm2yl6gyt6typefsnhjzrv66zkp6pzv0usuc3vam
#[cw_serde] 
pub struct CodeIds {
    pub cw4_group_code_id: u64,
    pub cw3_flex_mutlisig_code_id: u64,
}

pub const CODE_IDS: Item<CodeIds> = Item::new("code_ids");