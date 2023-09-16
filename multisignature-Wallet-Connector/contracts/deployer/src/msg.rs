use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Addr;
use cw3::UncheckedDepositInfo;
use cw4::Member;
use cw_utils::{Duration, Threshold};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[cw_serde]
pub struct InstantiateMsg {
    pub cw4_group_code_id: u64,
    pub cw3_flex_mutlisig_code_id: u64
}

/// Message type for `execute` entry_point
#[cw_serde]
pub enum ExecuteMsg {
    Connector {
        members: Vec<Member>,
        threshold_weight: u64,
        max_voting_period: u64,
    },
    CodeIDSetter {
        cw4_group_code_id: u64,
        cw3_flex_mutlisig_code_id: u64
    }
    
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub struct DeployMsg {  
    pub members: Vec<Member>,
    pub threshold_weight: u64,
    pub max_voting_period: u64,
}

#[cw_serde]
pub struct Cw4InstantiateMsg {
    pub admin: Option<String>,
    pub members: Vec<Member>,
}

#[cw_serde]
pub struct Cw3InstantiateMsg {
    // this is the group contract that contains the member list
    pub group_addr: String,
    pub threshold: Threshold,
    pub max_voting_period: Duration,
    // who is able to execute passed proposals
    // None means that anyone can execute
    pub executor: Option<Executor>,
    /// The cost of creating a proposal (if any).
    pub proposal_deposit: Option<UncheckedDepositInfo>,
}

#[cw_serde]
pub enum Executor {
    /// Any member of the voting group, even with 0 points
    Member,
    /// Only the given address
    Only(Addr),
}

/// Message type for `migrate` entry_point
#[cw_serde]
pub enum MigrateMsg {}

/// Message type for `query` entry_point
#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(GetListOfWalletResponse)]
    GetListOfWallet { user_address: String },
}

#[cw_serde]
pub struct GetListOfWalletResponse {
    pub wallets: Vec<String>,
}
